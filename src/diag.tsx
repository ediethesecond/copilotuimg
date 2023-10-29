import React, { useEffect, useState } from 'react';

interface DiagProps {
    id: string;
}

interface DiagData {
    // Define the shape of the data returned from the API
}

const Diag: React.FC<DiagProps> = ({ id }) => {
    const [data, setData] = useState<DiagData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            //const response = await fetch(`http://localhost:3000/api/diag?id=${id}`);
            //const json = await response.json();
            //setData(json);
        };

        fetchData();
    }, [id]);

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>df
            </div>
    );
};

export default Diag;
