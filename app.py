import json
import boto3
import pandas as pd
import io
import re
import os
from dotenv import load_dotenv
load_dotenv()

aws_access_key = os.getenv('AWS_ACCESS_KEY_ID')
aws_secret_key = os.getenv('AWS_SECRET_ACCESS_KEY')
aws_session_token = os.getenv('AWS_SESSION_TOKEN')
aws_region = "us-east-1"

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
            "max_gen_len": 100,
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
    Facilities: 3 main gates, 2 emergency exits, food stalls, medical tent, and security checkpoints.
    Your role is to provide correct and practical guidance so crew members can manage the event smoothly.
    If you don’t know the answer, you must say: "I don't know, please ask the manager".
    """
    
    prompt = f"{system_prompt}\n\nCrew member question: {message}\nSupervisor answer:"
    return llm(prompt)

def entry_rush():
    df = s3()
    df_not_entered = df[(df['Status'] == 'Not Entered') | (df['Status'] == 'Exited')]

    A_count = df_not_entered[df_not_entered['Seat/Zone'].str.startswith('A')].shape[0]
    B_count = df_not_entered[df_not_entered['Seat/Zone'].str.startswith('B')].shape[0]
    C_count = df_not_entered[df_not_entered['Seat/Zone'].str.startswith('C')].shape[0]
    
    system_prompt = f"""
    You are an experienced and helpful event crew supervisor.

    Event Details:
    - 3 main gates: A, B, C
    - Attendees at gate A: {A_count}
    - Attendees at gate B: {B_count}
    - Attendees at gate C: {C_count}

    Task:
    - Assign crew to gates in proportion to attendees at each gate.
    - Total crew should not exceed 50.
    - Use ONLY the gates A, B, C.
    - Always output all gates, even if the value is 0.
    - Do NOT include any explanation, reasoning, or code in the response.
    - The output MUST be strictly valid JSON in the format of the example below.
    - DO NOT return anything other than the JSON format.

    Required JSON schema:
    {{
        "A": <integer>,
        "B": <integer>,
        "C": <integer>
    }}

    Example (numbers are placeholders):
    {{
        "A": 10,
        "B": 5,
        "C": 35
    }}
    """

    result = llm(system_prompt)
    json_match = re.search(r'\{[^{}]*\}', result)

    return json.loads(json_match.group(0))

def what_if(message):
    system_prompt = """
    You are an experienced and helpful event crew supervisor.
    You are given a task to answer questions from crew members.
    The event is a music concert on 22 September 2025, from 7:00 PM to 10:00 PM.
    Location: Kuala Lumpur Concert Hall.
    Genre: Pop and Rock.
    Headline Artist: The Rising Stars Band.
    Audience size: ~1,000 attendees.
    Facilities: 3 main gates, 2 emergency exits, food stalls, medical tent, and security checkpoints.
    Your role is to provide plan if anything happens (rain, fire, etc.)
    so crew members can manage the event smoothly.
    No explanation or chain of thought needed, just return the result in JSON format.
    Example output:
    {
        "situation": "rain",
        "estimated_count": 100,
        "plan": "If it rains, we will move the event to the indoor stadium."
    }
    Only provide the plan the user asked for, no other text or explanation.
    """
    
    prompt = f"{system_prompt}\n\nScenario: {message}"

    result = llm(prompt)
    return json.loads(result)

if __name__ == "__main__":
    #print(chat_bot("Which gate should I assign for VIP ticket holders?"))
    print(entry_rush())
    #print(what_if('rain'))
