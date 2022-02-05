module.exports = ({ env }) => {
  const cred = env.json("FIREBASE_SERVICE_ACCOUNT");
  const bucket = env("FIREBASE_STORAGE_BUCKET");

  return {
    upload: {
      enable: true,
      config: {
        provider: "provider-upload-firebase",
        providerOptions: {
          serviceAccount: cred,
          bucket,
        },
      },
    },
  };
};
