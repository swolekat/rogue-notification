const path = require("path");
const gmail = require("gmail-tester");

const rogueEmailAddress = 'support@rogueenergy.com';
const title = 'New Rogue Energy Referral Sale Made!';
let mostRecentDate = undefined;

const sendNotification = () => {
    console.log('sending notification');
    fetch('http://127.0.0.1:9450/webhook', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "trigger": "rougeSaleWebhook",
        }),
    }).then(async (response) => {
        const data = await response.json();
        console.log(data);
    }).catch(e => {
        console.log(e);
    });
};

const checkInbox = async () => {
    console.log('checking the inbox');
    const messages = await gmail.get_messages(
        path.resolve(__dirname, "credentials.json"), // Assuming credentials.json is in the current directory.
        path.resolve(__dirname, "gmail_token.json"), // Look for gmail_token.json in the current directory (if it doesn't exists, it will be created by the script).
        {
            subject: title,
            from: rogueEmailAddress,
            wait_time_sec: 10,
            max_wait_time_sec: 30,
        }
    );
    if(!mostRecentDate) {
        if(messages.length === 0){
            mostRecentDate = new Date(0);
        } else {
            mostRecentDate = messages[0].date;
        }
    }
    if(messages.length > 0){
        const newDate = messages[0].date;
        if(newDate > mostRecentDate){
            try {
                sendNotification();
            } catch(e) {
                console.log(e);
            }
        }
    }
};

const main = () => {
    checkInbox();
    setInterval(() => {
        checkInbox();
    }, 60000);
};

main();
