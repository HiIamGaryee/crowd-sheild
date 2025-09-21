from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import boto3
import pandas as pd
import io
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Get AWS credentials from environment variables
aws_access_key = os.getenv('AWS_ACCESS_KEY_ID')
aws_secret_key = os.getenv('AWS_SECRET_ACCESS_KEY')
aws_session_token = os.getenv('AWS_SESSION_TOKEN')
aws_region = os.getenv('AWS_REGION', 'us-east-1')

def llm(prompt):
    # Create Bedrock client
    llm = boto3.client(
        service_name="bedrock-runtime",
        region_name=aws_region,
        aws_access_key_id=aws_access_key,
        aws_secret_access_key=aws_secret_key,
        aws_session_token=aws_session_token
    )

    model_id = "meta.llama3-70b-instruct-v1:0"
    response = llm.invoke_model(
        modelId=model_id,
        body=json.dumps({
            "prompt": prompt,
            "max_gen_len": 200,
            "temperature": 0.7,
            "top_p": 0.9
        })
    )

    result = json.loads(response['body'].read())
    return result['generation']

def s3():
    s3 = boto3.client(
    "s3",
    region_name="us-east-1",
    aws_access_key_id=aws_access_key,
    aws_secret_access_key=aws_secret_key,
    aws_session_token=aws_session_token
    )

    bucket = "audiencedata"
    key = "crowdshield_mock_audience_1200.csv"

    obj = s3.get_object(Bucket=bucket, Key=key)
    data = obj["Body"].read().decode("utf-8")

    df = pd.read_csv(io.StringIO(data))
    return df

def chat_bot(message):
    system_prompt = """
    You are an experienced and helpful event crew supervisor.
    You are given a task to answer questions from crew members.
    The event is a music concert on 22 September 2025, from 7:00 PM to 10:00 PM.
    Location: Kuala Lumpur Concert Hall.
    Genre: Pop and Rock.
    Headline Artist: The Rising Stars Band.
    Audience size: ~1,000 attendees.
    Facilities: 6 main gates, 2 emergency exits, food stalls, medical tent, and security checkpoints.
    Your role is to provide correct and practical guidance so crew members can manage the event smoothly.
    If you don’t know the answer, you must say: "I don't know, please ask the manager".
    """
    
    prompt = f"{system_prompt}\n\nCrew member question: {message}\nSupervisor answer:"
    return llm(prompt)



@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json()
    message = data.get('message', '')
    response = chat_bot(message)
    return jsonify({'response': response})

if __name__ == "__main__":
    print("Starting AI Bot server...")
    app.run(host='0.0.0.0', port=8000, debug=True)