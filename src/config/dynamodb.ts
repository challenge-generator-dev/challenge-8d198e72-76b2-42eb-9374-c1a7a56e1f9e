import AWS from 'aws-sdk';

const DYNAMODB_ENDPOINT = process.env.DYNAMODB_ENDPOINT || 'http://localhost:8000';
const AWS_REGION = process.env.AWS_REGION || 'us-east-1';
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || 'local';
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || 'local';
const DYNAMODB_TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || 'products';

export interface DynamoDBConfig {
  endpoint: string;
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
}

export interface DynamoDBClientConfig {
  DocumentClient: {
    put: (params: AWS.DynamoDB.PutItemInput) => Promise<AWS.DynamoDB.PutItemOutput>;
    get: (params: AWS.DynamoDB.GetItemInput) => Promise<AWS.DynamoDB.GetItemOutput>;
    update: (params: AWS.DynamoDB.UpdateItemInput) => Promise<AWS.DynamoDB.UpdateItemOutput>;
    delete: (params: AWS.DynamoDB.DeleteItemInput) => Promise<AWS.DynamoDB.DeleteItemOutput>;
    scan: (params: AWS.DynamoDB.ScanInput) => Promise<AWS.DynamoDB.ScanOutput>;
  };
}

class DynamoDBConfiguration {
  private static instance: AWS.DynamoDB.DocumentClient;
  private static config: DynamoDBConfig;

  private constructor() {}

  static getConfig(): DynamoDBConfig {
    if (!DynamoDBConfiguration.config) {
      DynamoDBConfiguration.config = {
        endpoint: DYNAMODB_ENDPOINT,
        region: AWS_REGION,
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      };
    }
    return DynamoDBConfiguration.config;
  }

  static getDocumentClient(): AWS.DynamoDB.DocumentClient {
    if (!DynamoDBConfiguration.instance) {
      const config = DynamoDBConfiguration.getConfig();
      const isLocal = config.endpoint.includes('localhost') || config.endpoint.includes('127.0.0.1');

      const awsConfig: AWS.Configuration = {
        region: config.region,
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      };

      if (isLocal) {
        awsConfig.endpoint = config.endpoint;
        (awsConfig as any).sslEnabled = false;
        (awsConfig as any).signatureVersion = 'v4';
      }

      AWS.config.update(awsConfig);

      DynamoDBConfiguration.instance = new AWS.DynamoDB.DocumentClient();
    }

    return DynamoDBConfiguration.instance;
  }

  static getTableName(): string {
    return DYNAMODB_TABLE_NAME;
  }

  static resetInstance(): void {
    DynamoDBConfiguration.instance = undefined as unknown as AWS.DynamoDB.DocumentClient;
    DynamoDBConfiguration.config = undefined as unknown as DynamoDBConfig;
  }

  static isLocalEnvironment(): boolean {
    const config = DynamoDBConfiguration.getConfig();
    return config.endpoint.includes('localhost') || config.endpoint.includes('127.0.0.1');
  }
}

export const dynamoDBConfig = DynamoDBConfiguration.getConfig();
export const documentClient = DynamoDBConfiguration.getDocumentClient();
export const tableName = DynamoDBConfiguration.getTableName();
export default DynamoDBConfiguration;