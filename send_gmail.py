#gmailでメールを送るモジュール

import smtplib
from email.mime.text import MIMEText
from email.utils import formatdate

def send_gmail(from_address, to_address, subject, body, pw):

    msg = MIMEText(body)
    msg['Subject'] = subject
    msg['From'] = from_address
    msg['To'] = to_address
    msg['Date'] = formatdate()

    smtpobj = smtplib.SMTP('smtp.gmail.com', 587)
    smtpobj.ehlo()
    smtpobj.starttls()
    smtpobj.ehlo()
    smtpobj.login(from_address, pw)
    smtpobj.sendmail(from_address, to_address, msg.as_string())
    smtpobj.close()