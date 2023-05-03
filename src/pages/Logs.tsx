import axios from "axios";
import { useEffect, useState } from "react";

interface Log {
    date: string;
    errorCode: string;
    errorMessage: string;
    user: string;
}

export function Logs() {
    const [logs, setLogs] = useState<Log[]>([])
    useEffect(() => {
        axios.get("/getLogs")
            .then(response => {
                console.log(response.data)

                // transformar response.data a un array de Logs
                // i posarlos aqui amb setLogs
                const newLogs: Log[] = []

                setLogs(newLogs)
            })

    }, [])

    const logsFake: Log[] = [
        { date: "10-20-2022", errorCode: "500", errorMessage: "bla bla", user: "pepito" },
        { date: "15-22-2023", errorCode: "500", errorMessage: "bla bla", user: "pepita" },
        { date: "12-43-2022", errorCode: "500", errorMessage: "blu bli", user: "josue" }
    ]

    // fer
    return <div>rellenar aqui {logs.map((log) => log.user + ".")}</div>
}