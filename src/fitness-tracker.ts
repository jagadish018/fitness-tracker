type User = {
    id?: string | null;
    name: string;
    age: number;
    weight: number;
    height: number;
    workouts?: Workout[];
}

type Workout = {
    type: string;
    duration: number;
    caloriesBurned: number;
    date: string; 
}

const users: Map<string, User> = new Map();

export function addUser(user: User): string {
    let id = Math.random().toString(36).substring(2, 11);
    user.id = id;
    user.workouts = [];
    users.set(id, user);
    console.log(`Username: ${user.name} added successfully with id: ${id}.\n`);
    return id;
}

export function logWorkout(userId: string, workout: Workout): void {
    if (!users.has(userId)) {
        throw new Error("User not found!");
    }
    const user = users.get(userId)!;
    user.workouts!.push(workout);
    users.set(userId, user);
    console.log(`Workout logged successfully for user with id: ${userId}.\n`);
}

export function getAllWorkoutsOf(userId: string): Workout[] {
    if (!users.has(userId)) {
        throw new Error("User not found!");
    }
    return users.get(userId)!.workouts! || null;
}

export function getAllWorkoutsByType(userId: string, type: string): Workout[] {
    if (!users.has(userId)) {
        throw new Error("User not found!");
    }
    return users.get(userId)!.workouts!.filter(workout => workout.type === type) || null;
}

export function getUsers(): User[] {
    return Array.from(users.values()) || null;
}

export function getUser(id: string): User | null {
    if (!users.has(id)) {
        throw new Error(`User with id ${id} not found!`);
    }
    return users.get(id) || null;
}

export function updateUser(id: string, updatedFields: Partial<Omit<User, 'id'>>): void {
    if (!users.has(id)) {
        throw new Error("User not found!");
    }
    const user = users.get(id)!;
    const updatedUser = { ...user, ...updatedFields };
    users.set(id, updatedUser);
    console.log(`User with id: ${id} updated successfully.\n`);
}