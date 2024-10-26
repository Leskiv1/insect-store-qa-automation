const URL = 'http://localhost:3000/api/insect';

export async function createInsect(insect) {
    try {
        const res = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(insect)
        })

        if (res.status === 400) {
            return res.json()
        }

        if (!res.ok) {
            throw new Error(`${res.status} ${res.statusText}`);
        }

    } catch (error) {
        console.log(error)
    }
}

export async function deleteInsect(id) {
    try {
        const res = await fetch(URL + `/${id}`, {
            method: 'DELETE'
        })

        if (!res.ok) {
            throw new Error(`${res.status} ${res.statusText}`);
        } else {
            return res.json();
        }

    } catch (error) {
        console.log(error)
    }
}

export async function updateInsect(insect, id) {
    try {
        const res = await fetch(URL + `/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(insect)
        })

        if (!res.ok) {
            throw new Error(`${res.status} ${res.statusText}`);
        } else {
            return res.json();
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getInsects(name = '', sort = '') {
    try {
        const res = await fetch(URL + `?name=${name}&sort=${sort}`, {
            method: 'GET'
        })

        if (!res.ok) {
            throw new Error(`${res.status} ${res.statusText}`);
        } else {
            return res.json();
        }

    } catch (error) {
        console.log(error)
    }
}

export async function countWeight(name = '', sort = '') {
    try {
        const res = await fetch(URL + '/count' + `?name=${name}&sort=${sort}`, {
            method: 'GET'
        })

        if (!res.ok) {
            throw new Error(`${res.status} ${res.statusText}`);
        } else {
            return res.json();
        }

    } catch (error) {
        console.log(error)
    }
}