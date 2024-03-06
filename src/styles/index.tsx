import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`

    ::-webkit-scrollbar {
        background: rgba(157,195,230,0.8);

        border-radius: 20px;
        width: 8px;
    }
    ::-webkit-scrollbar-thumb {
        background: rgba(157,195,230,0.3);

        border-radius: 20px;
        width: 8px;
    }
    :root{
        --color-text: rgb(18, 101, 171);
        --color-border-button: linear-gradient(44.7deg, #00FF00 14.53%, #00F322 20.2%, #00D378 33.65%, #00A5F7 51.36%, #171AFE 80.39%, #1B00FF 85.35%);
        --bg1: #fff;
        --bg2: #f5f6fc;
        --bg3: #f5f6fc;
        --bg4: #fff;
        --bg5: #fff;
        --bg6: #000;
        --btn1: linear-gradient(#0dccea,#0d70ea);
        --btn2: #ffffff1c;
        --border1: #d2d9ee;
        --border2: #adccdd;
        --border3: #04161d;
        --hover1: #c9c9c9;
        --hover2: #c9c9c921;
        --text1: #000;
        --text2: #000;
        --text3: #fff;
        --text4: #ff0085;

        // New color 
        --thanhngang: #121926;
        --main-color: #ffffff;
        --bg-2:linear-gradient(180deg, #2D73F5 0%, #40BCFE 100%);
        --background1: #011027;
        --background: #2d73f5;
        --text-hover:#2d73f5;

        // New text size
        --text-title: 80px;
        --text-content: 20px;
        --text-page-title: 40px;

        @media only screen and (max-width: 1200px) {
            --text-title: 60px;
            --text-content: 16px;
            --text-page-title: 28px;
        }
        @media only screen and (max-width: 768px) {
            --text-title: 35px;
            --text-content: 16px;
            --text-page-title: 25px;
        }
        @media only screen and (max-width: 576px) {
            --text-title: 30px;
            --text-content: 14px;
            --text-page-title: 20px;
        }
    }

    .t1 {
        color: var(--text1);
    }

    .t2 {
        color: var(--text2);
    }

    .to {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    a {
        color: #000;
        text-decoration: none;

        :hover {
            text-decoration: underline;
        }
    }

    img {
        width: 100%;
        object-fit: contain;
    }

    .b {
        font-weight: 600;
    }
    a.icon-add {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    a.icon-add img {
        width:30px;
    }
`
