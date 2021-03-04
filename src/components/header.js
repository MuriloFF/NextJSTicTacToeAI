import Head from 'next/head'


export default function Header() {
    return <Head >
        <title>Tit Tac Toe with MinMaxAI</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
            key="title"
            name="Description"
            content="A simple AI created with MinMax method. It's a simple AI with a simple Tic Tac Toe game."
            property="og:title"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
}