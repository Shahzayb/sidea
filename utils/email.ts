import SGMail from '@sendgrid/mail';
import {
  sendGridApiKey,
  companyEmail,
  companyName,
  clientBaseUrl,
} from '../env';

SGMail.setApiKey(sendGridApiKey);

export function sendForgotPasswordEmail({
  username,
  id,
  token,
  email,
}: {
  username: string;
  id: string | number;
  token: string;
  email: string;
}) {
  const link = new URL(
    `/password/reset?token=${token}&userId=${id}`,
    clientBaseUrl
  ).toString();

  const data = {
    text: `Your username is: 
    ${username}

   Visit this link to reset your password: 
   <a href=${link}>${link}</a>

  Note: This link is only valid for 1 hour. And you cannot reuse this link.
  `,
    html: `Your user name is: 
  <br><br>
    ${username}
  <br><br>
   Visit this link to reset your password:
  <br><br>
   <a href=${link}>${link}</a>
  <br><br>
  <strong>Note:</strong> This link is only valid for 1 hour. And you cannot reuse this link.
  `,
    to: email,
    from: {
      email: companyEmail,
      name: companyName,
    },
    subject: 'Sidea Account',
  };

  return SGMail.send(data);
}
