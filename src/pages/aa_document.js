import Document, { Main, NextScript } from 'next/document'


export default class MyDocument extends Document {
    render() {
        return (
            <html lang='en'>
                <Header />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        )
    }
}
