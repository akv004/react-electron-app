import React, {FC} from 'react';



export const Page: FC = () => {
    const [out, setOut] = React.useState<any>({"a":"1"});
    //const name = base64.encode('Test');
    return (
        <div className="page-container">
            <h1>Page.tsx</h1>
        </div>

    )
}
