const GetHTMLTemplate = (text , subject) => {
    return (`<html>
    <head>
    <meta charset="utf-8">
    <title>${subject}</title>
    <style>
        .container {
            font-family: 'Vazirmatn', Tahoma , sans-serif;
            width: 100%;
            height: 100%;
            padding: 20px;
            background-color: #f4f4f4;
        }

        .email {
            width: 80%;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
        }

        .email-header {
            background-color: #333;
            color: #fff;
            padding: 20px;
            text-align: center;
        }

        .email-body {
            padding: 20px;
        }

        .email-footer {
            background-color: #333;
            color: #fff;
            padding: 20px;
            text-align: center;
        }
    </style>
    <div class="container">
        <div class="email">
            <div class="email-header">
                <h1>${subject}</h1>
            </div>
            <div class="email-body">
                <p>${config.lang.pass_reset_email_text}</p>
                <p>${text}</p>
            </div>
            <div class="email-footer">
                <p>@2023</p>
            </div>
        </div>
    </div>
    </head>
    </html>`);
}
module.exports = GetHTMLTemplate;