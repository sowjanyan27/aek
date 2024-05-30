export const Storage_Params = {
    storageLocalType: 'FileSystem',
    storageAwsType:'s3',
    localConfig: {
        storageDirectory: '/path/to/your/storage/directory',
      },
   
  };

  export const Storage_Params1 = {
    storageType: 's3', 
    s3Config: {
      accessKeyId: 'YOUR_ACCESS_KEY_ID',
      secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
      region: 'YOUR_S3_REGION',
      bucketName: 'YOUR_S3_BUCKET_NAME',
    },
    localConfig: {
      storageDirectory: '/path/to/your/storage/directory',
    },
  };
  
  