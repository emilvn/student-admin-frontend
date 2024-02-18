// import endpoint from .env file
class Api<T> {
    protected static endpoint: string = import.meta.env.VITE_API_URL as string;
    protected path: string;

    constructor(path: string) {
        this.path = path;
    }

    public get = async (): Promise<T[] | null> => {
        const response = await fetch(Api.endpoint + this.path);
        if (!response.ok) {
            return null;
        }
        if (response.status === 204) {
            return [];
        }
        return await response.json();
    };
    public getById = async (id: number): Promise<T | null> => {
        const response = await fetch(Api.endpoint + this.path + "/" + id);
        if (!response.ok) {
            return null;
        }
        return await response.json();
    };
    public post = async (data: Partial<T>): Promise<T | null> => {
        const response = await fetch(Api.endpoint + this.path, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            return null;
        }
        return await response.json();

    };
    public put = async (id: number, data: Partial<T>): Promise<T | null> => {
        const response = await fetch(Api.endpoint + this.path + "/" + id, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            return null;
        }
        return await response.json();
    };
    public patch = async (id: number, data: Partial<T>): Promise<T | null> => {
        const response = await fetch(Api.endpoint + this.path + "/" + id, {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            return null;
        }
        return await response.json();
    };
    public delete = async (id: number): Promise<T | null> => {
        const response = await fetch(Api.endpoint + this.path + "/" + id, {
            method: "DELETE"
        });
        if (!response.ok) {
            return null;
        }
        return await response.json();
    };

}

export default Api;