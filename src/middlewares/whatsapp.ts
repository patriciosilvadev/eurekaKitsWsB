import '../libs/dotenv';
import keys from '../security/keys'
import twilio from 'twilio';
console.log('ACOOUNT_SID ==> ', keys.whatsapp.acoount_sid);
console.log('AUTH_TOKEN ==> ', keys.whatsapp.auth_token);
console.log('MY_NUMBER_PHONE ==> ', keys.whatsapp.my_number_phone);
class Whatsapp {
    client = twilio(keys.whatsapp.acoount_sid, keys.whatsapp.auth_token);
    public whassap(dates: any) {
        console.log(dates);
        this.client.messages.create({
            to: 'whatsapp:+593995078151',
            from: 'whatsapp:+14155238886',
            body: dates
        }).then(res => {
            console.log(res.sid);
        },
            err => {
                console.log(err);
            });
    }
}
const whatsapp = new Whatsapp();
export default whatsapp;