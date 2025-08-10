const  { SendEmailCommand } = require("@aws-sdk/client-ses");
const { sesClient } = require("./sesClient");

const createSendEmailCommand = (toAddress, fromAddress, Subject, body) => {
  return new SendEmailCommand({
    Destination: {
      CcAddresses: [
      ],
      ToAddresses: [
        toAddress,
      ],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `<h1> ${body}</h1>`,
        },
        Text: {
          Charset: "UTF-8",
          Data: "This is the text format email",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: Subject,
      },
    },
    Source: fromAddress,
    ReplyToAddresses: [
      /* more items */
    ],
  });
};

const run = async (Subject, body, toEmailId) => {
  const sendEmailCommand = createSendEmailCommand(
    // Replace with the recipient's email address
    "prakashmaddi525@gmail.com",
    // Replace with the sender's email address
    // This email address must be verified with Amazon SES.
    "prakashmaddi325@gmail.com",
    Subject,
    body
  );

  try {
    return await sesClient.send(sendEmailCommand);
  } catch (caught) {
    if (caught instanceof Error && caught.name === "MessageRejected") {
      const messageRejectedError = caught;
      return messageRejectedError;
    }
    throw caught;
  }
};

// snippet-end:[ses.JavaScript.email.sendEmailV3]
module.exports = { run };