//HW 1

const delay = ms => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(ms);
        }, ms);
    });
};

const logger = time => console.log(`Resolved after ${time}ms`);

// Logger to show valid code function
delay(2000).then(logger); // Resolved after 2000ms
delay(1000).then(logger); // Resolved after 1000ms
delay(1500).then(logger); // Resolved after 1500ms

// HW 2

const users = [
    { name: "Mango", active: true },
    { name: "Poly", active: false },
    { name: "Ajax", active: true },
    { name: "Lux", active: false }
];


const toggleUserState2 = (allUsers, userName) => {
    return new Promise((resolve, reject) => {
        const updatedUsers = allUsers.map(user =>
            user.name === userName ? { ...user, active: !user.active } : user
        );

        resolve(updatedUsers);
    });
};


const logger2 = updatedUsers => console.table(updatedUsers);

/*
 * Сейчас работает так
 */
toggleUserState2(users, "Mango", logger2);
toggleUserState2(users, "Lux", logger2);

/*
 * Должно работать так
 */
toggleUserState2(users, "Mango").then(logger2);
toggleUserState2(users, "Lux").then(logger2);
//HW 3

const randomIntegerFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};


const makeTransaction2 = transaction => {
    const delay = randomIntegerFromInterval(200, 500);
    return new Promise((resolve, reject) => {
        let id = transaction.id;
        setTimeout(() => {
            const canProcess = Math.random() > 0.3;
            
            if (canProcess) {
                const result = {id, delay};
                resolve(result);
            } else {
                reject(Error(transaction.id));
            }
        }, delay);
    });
};

const logSuccess = (id, time) => {
    console.log(`Transaction ${id} processed in ${time}ms`);
};

const logSuccess2 = (result) => {
    console.log(`Transaction ${result.id} processed in ${result.delay}ms`);
};

const logError = id => {
    console.warn(`Error processing transaction ${id}. Please try again later.`);
};

 makeTransaction2({ id: 70, amount: 150 })
    .then(logSuccess2)
    .catch(logError);

makeTransaction2({ id: 71, amount: 230 })
    .then(logSuccess2)
    .catch(logError);

makeTransaction2({ id: 72, amount: 75 })
    .then(logSuccess2)
    .catch(logError);

makeTransaction2({ id: 73, amount: 100 })
    .then(logSuccess2)
    .catch(logError);