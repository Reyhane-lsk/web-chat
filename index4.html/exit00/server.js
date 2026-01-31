const WebSocket = require('ws');

// پورت ۸۰۸۰ را برای سرور WebSocket تنظیم کنید
const wss = new WebSocket.Server({ port: 8080 });

console.log('سرور WebSocket در حال اجرا است: ws://localhost:8080');

// مدیریت اتصال جدید
wss.on('connection', function connection(ws) {
    console.log('یک کلاینت جدید متصل شد.');

    // ارسال پیام خوش‌آمدگویی
    const welcomeMessage = {
        sender: 'agent',
        text: 'شما به صورت زنده به سرور Exito متصل شدید! می‌توانید پیام ارسال کنید.',
        type: 'text',
        room: 'mag' 
    };
    ws.send(JSON.stringify(welcomeMessage));

    // مدیریت پیام‌های دریافتی از کلاینت
    ws.on('message', function incoming(message) {
        let msgObject;
        try {
            msgObject = JSON.parse(message.toString()); 
            console.log(`پیام دریافتی از اتاق ${msgObject.room} توسط کاربر:`, msgObject.text);
        } catch (e) {
            console.error('پیام JSON نامعتبر دریافت شد:', message.toString());
            return;
        }

        // پاسخ Agent فقط برای اتاق 'mag'
        if (msgObject.room === 'mag' && msgObject.sender === 'user') {
            const agentResponseText = msgObject.type === 'media' ? 'فایل شما دریافت و برای Agent ارسال شد.' : `پیام شما ("${msgObject.text}") با موفقیت دریافت شد.`;
            
         
            // در فایل server.js، جایی که پاسخ Agent را می‌سازید و ارسال می‌کنید:

const agentResponse = {
    room: 'mag',
    sender: 'agent',
    text: 'متن پاسخ Agent شما...', // این فیلد حیاتی است!
    type: 'text',
    // سایر فیلدها (مانند url, mediaType) اختیاری هستند، اما اگر ندارید، حذفشان کنید.
};

ws.send(JSON.stringify(agentResponse));

          

    ws.on('close', () => {
        console.log('کلاینت قطع اتصال کرد.');
    });

    ws.on('error', (err) => {
        console.error('خطای WebSocket:', err);
    });
});