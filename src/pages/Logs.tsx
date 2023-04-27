interface Log {
    date: string;
    errorCode: string;
    errorMessage: string;
    user: string;
}

export function Logs() {
    const logs: Log[] = [
        { date: "10-20-2022", errorCode: "500", errorMessage: "bla bla", user: "pepito" },
        { date: "15-22-2023", errorCode: "500", errorMessage: "bla bla", user: "pepita" },
        { date: "12-43-2022", errorCode: "500", errorMessage: "blu bli", user: "josue" }
    ]

    // fer
    return <div>rellenar aqui</div>
}