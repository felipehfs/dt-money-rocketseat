import { createGlobalStyle} from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    
    :root {
        --background: #f8f2f5;
        --red: #E62E4D;
        --blue: #5429CC;
        --green:  #33CC95;
        --blue-light: #6933ff;

        --text-title: #363F5F;
        --text-body: #969cb3;

        --shape: #fff;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body, input, textarea, button {
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
    }

    h1, h2, h3, h4, h5, h6, strong {
        font-weight: 600;
    }
    // 16px valor inicial (desktop) vai para 15px

    html { 
        @media(max-width: 1080px) {
            font-size: 93.75%;
        }

        @media(max-width: 728px) {
            font-size: 87.5%; // 14px
        }
    }

    button {
        cursor: pointer;
    }

    [disabled] {
        cursor: not-allowed;
        opacity: 0;
    }


    body {
        background: var(--background);
        -webkit-font-smoothing: antialiased;
    }
`