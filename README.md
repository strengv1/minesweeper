# Minesweeper Web Application - IaC Deployment

A full-stack Minesweeper game with React frontend and Node.js backend, deployed on AWS using Infrastructure as Code (CDK).

## Architecture

- **Frontend**: React app hosted on S3 + CloudFront CDN
- **Backend**: Node.js Lambda function exposed via API Gateway
- **Database**: MongoDB Atlas
- **IaC**: AWS CDK with TypeScript

## Prerequisites

### Required Tools
1. **Node.js**
```bash
   node --version
```

2. **AWS CLI** (v2)
```bash
   aws --version
```
   Install: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html

3. **AWS CDK**
```bash
   npm install -g aws-cdk
   cdk --version
```

### AWS Setup
1. **Configure AWS credentials**:
```bash
   aws configure
```
   Enter your AWS Access Key ID, Secret Access Key, default region (e.g., `eu-north-1`)

2. **Bootstrap CDK** (first-time setup per AWS account/region):
```bash
   cd infra
   cdk bootstrap
```

### MongoDB Atlas Setup
1. Create a free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster (free tier M0)
3. Create a database user
4. Whitelist all IPs (0.0.0.0/0) for Lambda access
5. Get connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)


## Deployment

### 1. Install Dependencies
Run "npm i" in /frontend, /backend and /infra folders
Run "npm run build" in /frontend

### 2. Configure Environment
Export/set MONGODB_URI as environment variable:
Linux:
```bash
export MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/minesweeper?retryWrites=true&w=majority"
```
Windows:
```bash
$env:MONGODB_URI = "mongodb+srv://username:password@cluster.mongodb.net/minesweeper?retryWrites=true&w=majority"
```

### 3. Deploy Infrastructure
```bash
cd infra
cdk deploy
```

### 4. Update Frontend API Endpoint (Find it in the output)

```bash
# Update frontend config with BackendURL
cd frontend
npm run build
cd ../infra
cdk deploy  # Redeploy to update frontend
```

## Destruction

To tear down all resources:
```bash
cd infra
cdk destroy
```

## Design Decisions & Trade-offs

**1. MongoDB not in IaC:** The server is running in a free MongoDB Atlas Cluster instead of AWS, and it is not deployed/destroyed with the rest of the stack. This is due to me having already spent the AWS free period, and the alternatives cost more than pennies, which I don't want to pay for a portfolio app. EC2+Docker would've been easier solution, as I already use Docker for local development.

Alternatives and their estimated cost:
- EC2 t4g.nano: | 1.83€/Month
- Smallest DocumentDB instance, 10h/month utilization | 0.0798 USD hourly => 0.77€/Month

Lambda functions and S3 are basically free at the expected traffic, and they disappear into my adjacent AWS bill. 

**2. Secrets** are passed via env variables, I wish I could use AWS Secrets Manager, but it isn't free.

**3. CI/CD:** Manual deployment, may benefit from Github actions if this was in active development.

**4. Domain:** For an actual project I would get a proper domain, for now using Cloudfront's default domain.


## Local development

### Server + Backend, run in root
```bash
docker-compose up --build -d
```

### Frontend, run in /frontend
```bash
npm start
```


Deploy with

$env:MONGODB_URI = "mongodb+srv://username:password@cluster.mongodb.net/minesweeper"
cd infra
cdk deploy