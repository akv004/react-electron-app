import React, {FC} from 'react';

const sendSubmit = async (args: any) => {
    console.log(args);
    let result = await window.electron.ipcRenderer.invoke("mysql", args);
    return result;
}

export const Page: FC = () => {
    const [out, setOut] = React.useState<any>({"a":"1"});
    //const name = base64.encode('Test');
    const sendMsg = async () => {
        sendSubmit({"port": "333", "server": "8080"}).then((value) => {
                setOut(value)
            }
        )
    }
    return (
        <div className="page-container">
            <h1>Page.tsx</h1>
            <button onClick={sendMsg}>Send MSG???</button>
            <div>{JSON.stringify(out)}</div>
        </div>

    )
}
