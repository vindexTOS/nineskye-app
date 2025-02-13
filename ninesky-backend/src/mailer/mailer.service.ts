import { Injectable } from '@nestjs/common';
import { CreateMailerDto } from './dto/create-mailer.dto';
import { UpdateMailerDto } from './dto/update-mailer.dto';
import * as nodemailer from 'nodemailer'
@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;
  constructor(){
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      host: process.env.EMAIL_HOST,
      port: 465,
      secure: true,
      auth : {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    })
  }

  async sendActivationEmail(token : string , email : string): Promise<void> {
    try {
      const mailOptions = {
        from: process.env.EMAIL_FROM,  
        to: email, 
        subject: 'ანგარიშის გააქტიურება', 
        html: `<p> ანგარიშის გასააქტიურებლად გადადით <a href="${process.env.REMOTE_ADDRESS}/verify/${token}">ბმულზე</a>.</p>`
    };

 this.transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error sending email:') 
        } else {
             console.log('Activation email sent:') 
        }
    });
  
    } catch (error) {
      console.log("500 errori")
      throw new Error(error)
    }
    
  
 
}

async sendPasswordRecoverylink(token : string , email : string): Promise<void> {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,  
      to: email, 
      subject: 'პარილის აღგდგენა', 
      html: `<p> პაროლის აღსაგდგენად გადადით <a href="${process.env.REMOTE_ADDRESS}/recovery/${token}"> ბმულზე</a>.</p>`
  };

this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:') 
      } else {
           console.log('Activation email sent:') 
      }
  });

  } catch (error) {
    console.log("500 errori")
    throw new Error(error)
  }
}
}
