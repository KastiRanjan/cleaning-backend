import fs from 'fs';
import handlebars from 'handlebars';
import mjml2html from 'mjml';
import path from 'path';

type Props = {
  fileName: string;
  username?: string;
  emailTemplate?: any;
  url?: string;
};

export default async function compileEmailTemplate({ fileName, username, emailTemplate, url }: Props): Promise<string> {
  // const logo = emailTemplate ? JSON.parse(emailTemplate?.logo).files[0].path : null;
  // console.log(logo);
  console.log(emailTemplate.facebook);
  const data = {
    username: username,
    url: url ?? '',
    // logo: process.env.UI_BASE_URL + '/' + logo ?? '',
    facebook: emailTemplate?.facebook ?? '',
    instagram: emailTemplate?.instagram ?? '',
    twitter: emailTemplate?.twitter ?? '',
    linkedIn: emailTemplate?.linkedIin ?? '',
    mapUrl: emailTemplate?.mapUrl ?? '',
  };
  const mjMail = await fs.promises.readFile(path.join('src/email-templates', fileName), 'utf8');
  const template = mjml2html(mjMail).html;
  return handlebars.compile(template)(data).toString();
}
