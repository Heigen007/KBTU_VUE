import { reactive, Ref, ref } from "vue";

interface Person {
    id: number;
    PersonName: string;
    Avatar: string;
    Rating: number;
    comments?: Comment[];
    Password: string;
    Email: string;
    Age: number;
    Location: string;
    favorites: number[];
}

interface Comment {
    Commentary: string;
    Topic: string;
    PubDate: string;
}

interface RegisterData {
    PersonName: string;
    Email: string;
    Password: string;
    Age: number;
    Location: string;
    Avatar?: string;
    Topic?: string;
    Commentary?: string;
    favorites?: number[];
}

interface LoginData {
    Email: string;
    Password: string;
}

interface UpdateProfileData {
    PersonName?: string;
    Email?: string;
    Password?: string;
    Age?: number;
    Location?: string;
    Avatar?: string;
    Commentary?: string;
    Topic?: string;
}

class AuthService {
    people: Person[] = reactive(JSON.parse(localStorage.getItem('people') || '[]'));
    currentUser: Ref<Person | null> = ref(null);
    isAuthenticated = ref(Boolean(this.currentUser.value));
    selectedTopic = ref('Adventure');

    constructor() {
        if (this.people.length === 0) {
            this.people = this.seedInitialPeople();
            this.savePeopleToLocalStorage();
        }
        this.setCurrentUser();
    }

    public setSelectedTopic(topic: string): void {
        this.selectedTopic.value = topic;
    }

    public getSelectedTopic(): string {
        return this.selectedTopic.value
    }

    private setCurrentUser() {
        const userEmail = localStorage.getItem('user');
        const foundUser = userEmail ? this.people.find(person => person.Email === userEmail) : null;
        this.currentUser.value = foundUser || null;
        this.isAuthenticated.value = !!this.currentUser.value;
    }

    private seedInitialPeople(): Person[] {
        return [
            {
                id: 1,
                PersonName: 'Alex Turner',
                Avatar: '/avatars/male.png',
                Rating: 5,
                comments: [
                    {
                        Commentary: 'Passionate about the intersection of technology and sports.',
                        Topic: 'Adventure',
                        PubDate: '2024-09-01',
                    },
                    {
                        Commentary: 'Exploring the world of sports analytics and data visualization.',
                        Topic: 'Nature',
                        PubDate: '2024-08-17',
                    }
                ],
                Password: 'n',
                Email: 'alex@a.com',
                Age: 28,
                Location: 'London, UK',
                favorites: [2, 3],
            },
            {
                id: 2,
                PersonName: 'Sophia Williams',
                Avatar: '/avatars/female.png',
                Rating: 4,
                comments: [
                    {
                        Commentary: 'Exploring innovative teaching methods for better learning.',
                        Topic: 'Adventure',
                        PubDate: '2024-08-29',
                    }
                ],
                Password: 'n',
                Email: 'n@n.com',
                Age: 34,
                Location: 'New York, USA',
                favorites: [9, 14],
            },
            {
                id: 3,
                PersonName: 'Liam Johnson',
                Avatar: '/avatars/male.png',
                Rating: 4,
                comments: [
                    {
                        Commentary: 'Sharing travel experiences that inspire wanderlust.',
                        Topic: 'Nature',
                        PubDate: '2024-08-15',
                    }
                ],
                Password: 'n',
                Email: 'n@n.com',
                Age: 30,
                Location: 'Sydney, Australia',
                favorites: [4, 6],
            },
            {
                id: 4,
                PersonName: 'Emily Davis',
                Avatar: '/avatars/female.png',
                Rating: 3,
                comments: [
                    {
                        Commentary: 'Cooking delicious meals from around the world.',
                        Topic: 'Nature',
                        PubDate: '2024-09-02',
                    }
                ],
                Password: 'n',
                Email: 'n@n.com',
                Age: 29,
                Location: 'Toronto, Canada',
                favorites: [15, 1],
            },
            {
                id: 5,
                PersonName: 'Michael Brown',
                Avatar: '/avatars/male.png',
                Rating: 4,
                comments: [
                    {
                        Commentary: 'Analyzing the latest trends in sports analytics.',
                        Topic: 'Nature',
                        PubDate: '2024-07-25',
                    }
                ],
                Password: 'n',
                Email: 'n@n.com',
                Age: 40,
                Location: 'San Francisco, USA',
                favorites: [2, 3],
            },
            {
                id: 6,
                PersonName: 'Olivia Smith',
                Avatar: '/avatars/female.png',
                Rating: 2,
                comments: [
                    {
                        Commentary: 'Discussing child development and learning techniques.',
                        Topic: 'Nature',
                        PubDate: '2024-09-04',
                    }
                ],
                Password: 'n',
                Email: 'n@n.com',
                Age: 32,
                Location: 'Berlin, Germany',
                favorites: [2, 3],
            },
            {
                id: 7,
                PersonName: 'Daniel Martinez',
                Avatar: '/avatars/boy.png',
                Rating: 4,
                comments: [
                    {
                        Commentary: 'Budget travel tips for adventurous explorers.',
                        Topic: 'Adventure',
                        PubDate: '2024-08-12',
                    }
                ],
                Password: 'n',
                Email: 'n@n.com',
                Age: 26,
                Location: 'Barcelona, Spain',
                favorites: [2, 3],
            },
            {
                id: 8,
                PersonName: 'Ava Garcia',
                Avatar: '/avatars/female.png',
                Rating: 3,
                comments: [
                    {
                        Commentary: 'Promoting healthy lifestyle choices through food.',
                        Topic: 'Fashion',
                        PubDate: '2024-07-30',
                    }
                ],
                Password: 'n',
                Email: 'n@n.com',
                Age: 35,
                Location: 'Mexico City, Mexico',
                favorites: [2, 3],
            },
            {
                id: 9,
                PersonName: 'Noah Rodriguez',
                Avatar: '/avatars/male.png',
                Rating: 5,
                comments: [
                    {
                        Commentary: 'Tactics and strategies for successful sports teams.',
                        Topic: 'Fashion',
                        PubDate: '2024-08-28',
                    }
                ],
                Password: 'n',
                Email: 'n@n.com',
                Age: 31,
                Location: 'Miami, USA',
                favorites: [2, 3],
            },
            {
                id: 10,
                PersonName: 'Isabella Lee',
                Avatar: '/avatars/female.png',
                Rating: 4,
                comments: [
                    {
                        Commentary: 'Exploring the latest innovations in online education.',
                        Topic: 'Fashion',
                        PubDate: '2024-09-03',
                    }
                ],
                Password: 'n',
                Email: 'n@n.com',
                Age: 28,
                Location: 'Seoul, South Korea',
                favorites: [2, 3],
            },
            {
                id: 11,
                PersonName: 'James Wilson',
                Avatar: '/avatars/male.png',
                Rating: 2,
                comments: [
                    {
                        Commentary: 'Discovering hidden gems in travel destinations.',
                        Topic: 'Adventure',
                        PubDate: '2024-08-10',
                    }
                ],
                Password: 'n',
                Email: 'n@n.com',
                Age: 36,
                Location: 'Rome, Italy',
                favorites: [2, 3],
            },
            {
                id: 12,
                PersonName: 'Charlotte Thompson',
                Avatar: '/avatars/female.png',
                Rating: 5,
                comments: [
                    {
                        Commentary: 'Combining global cuisines for unique dining experiences.',
                        Topic: 'Fashion',
                        PubDate: '2024-07-18',
                    }
                ],
                Password: 'n',
                Email: 'n@n.com',
                Age: 33,
                Location: 'Tokyo, Japan',
                favorites: [2, 3],
            },
            {
                id: 13,
                PersonName: 'William Anderson',
                Avatar: '/avatars/male.png',
                Rating: 4,
                comments: [
                    {
                        Commentary: 'Understanding the impact of basketball worldwide.',
                        Topic: 'Modern',
                        PubDate: '2024-07-29',
                    }
                ],
                Password: 'n',
                Email: 'n@n.com',
                Age: 38,
                Location: 'Chicago, USA',
                favorites: [2, 3],
            },
            {
                id: 14,
                PersonName: 'Mia Clark',
                Avatar: '/avatars/female.png',
                Rating: 5,
                comments: [
                    {
                        Commentary: 'Enhancing education through technology and creativity.',
                        Topic: 'Modern',
                        PubDate: '2024-09-05',
                    }
                ],
                Password: 'n',
                Email: 'n@n.com',
                Age: 27,
                Location: 'Melbourne, Australia',
                favorites: [2, 3],
            },
            {
                id: 15,
                PersonName: 'Ethan Lewis',
                Avatar: '/avatars/male.png',
                Rating: 3,
                comments: [
                    {
                        Commentary: 'Memorable travel experiences that broaden horizons.',
                        Topic: 'Modern',
                        PubDate: '2024-08-20',
                    }
                ],
                Password: 'n',
                Email: 'n@n.com',
                Age: 29,
                Location: 'Vancouver, Canada',
                favorites: [2, 3],
            },
            {
                id: 16,
                PersonName: 'Sophia White',
                Avatar: '/avatars/female.png',
                Rating: 1,
                comments: [
                    {
                        Commentary: 'Encouraging healthy eating habits with plant-based diets.',
                        Topic: 'Modern',
                        PubDate: '2024-07-22',
                    }
                ],
                Password: 'n',
                Email: 'n@n.com',
                Age: 24,
                Location: 'Cape Town, South Africa',
                favorites: [2, 3],
            },
            {
                id: 17,
                PersonName: 'Jacob Hall',
                Avatar: '/avatars/male.png',
                Rating: 1,
                comments: [
                    {
                        Commentary: 'Teaching essential tennis skills to beginners.',
                        Topic: 'Modern',
                        PubDate: '2024-08-14',
                    }
                ],
                Password: 'n',
                Email: 'n@n.com',
                Age: 41,
                Location: 'Mumbai, India',
                favorites: [2, 3],
            },
            {
                id: 18,
                PersonName: 'Ava Young',
                Avatar: '/avatars/girl.png',
                Rating: 2,
                comments: [
                    {
                        Commentary: 'Implementing innovative techniques in classrooms.',
                        Topic: 'Modern',
                        PubDate: '2024-09-06',
                    }
                ],
                Password: 'n',
                Email: 'n@n.com',
                Age: 25,
                Location: 'Shanghai, China',
                favorites: [2, 3],
            },
            {
                id: 19,
                PersonName: 'Ryan King',
                Avatar: '/avatars/male.png',
                Rating: 4,
                comments: [
                    {
                        Commentary: 'Simplifying travel planning for families.',
                        Topic: 'Nature',
                        PubDate: '2024-08-08'
                    }
                ],
                Password: 'n',
                Email: 'n@n.com',
                Age: 37,
                Location: 'São Paulo, Brazil',
                favorites: [2, 3],
            },
            {
                id: 20,
                PersonName: 'Emma Green',
                Avatar: '/avatars/female.png',
                Rating: 3,
                comments: [
                    {
                        Commentary: 'Discovering new flavors and culinary traditions.',
                        Topic: 'Adventure',
                        PubDate: '2024-08-05',
                    }
                ],
                Password: 'n',
                Email: 'n@n.com',
                Age: 27,
                Location: 'Paris, France',
                favorites: [2, 3],
            },
        ];
    }

    private savePeopleToLocalStorage(): void {
        localStorage.setItem('people', JSON.stringify(this.people));
    }

    private saveCurrentUserToLocalStorage(): void {
        const people: Person[] = JSON.parse(localStorage.getItem('people') || '[]');

        if (this.currentUser.value) {
            const existingUserIndex = people.findIndex((user: Person) => user.id === this.currentUser.value?.id);

            if (existingUserIndex !== -1) {
                people[existingUserIndex] = this.currentUser.value;
            } else {
                people.push(this.currentUser.value);
            }
            localStorage.setItem('people', JSON.stringify(people));
        } else {
        }
    }

    register({
        PersonName, Email, Password, Age, Location, Avatar = '/avatars/default.png',
        Topic = 'General', Commentary = '', favorites = []
    }: RegisterData): void {
        if (this.userExists(Email)) throw new Error('Email already registered');

        const newUser: Person = {
            id: this.people.length + 1,
            PersonName,
            Email,
            Password,
            Age,
            Location,
            Avatar,
            Rating: 4,
            comments: [
                {
                    Commentary: 'Welcome to my profile!',
                    Topic: 'Adventure',
                    PubDate: new Date().toISOString().split('T')[0],
                }
            ],
            favorites
        };

        this.people.push(newUser);
        this.currentUser.value = newUser;
        this.savePeopleToLocalStorage();
        this.saveCurrentUserToLocalStorage();
        this.isAuthenticated.value = true;
        localStorage.setItem('user', Email);
    }

    login({ Email, Password }: LoginData): void {
        const user = this.people.find(person => person.Email === Email && person.Password === Password);
        if (!user) throw new Error('Invalid email or password');

        this.currentUser.value = user;
        this.isAuthenticated.value = true;
        this.saveCurrentUserToLocalStorage();
        localStorage.setItem('user', Email);
    }

    logout(): void {
        this.isAuthenticated.value = false;
        this.currentUser.value = null;
        localStorage.removeItem('currentUser');
    }

    addFavorite(userId: number): void {
        const id = Number(userId);
        if (!this.currentUser.value?.favorites.includes(userId)) {
            this.currentUser.value?.favorites.push(id);
            const person = this.people.find(person => person.id === id);
            if (person) {
                person.favorites.push(this.currentUser.value!.id);
                this.savePeopleToLocalStorage();
            }
            this.updateCurrentUserInPeople();
            this.saveCurrentUserToLocalStorage();
        }
    }

    removeFavorite(userId: number): void {
        if (this.currentUser.value != null) {
            this.currentUser.value.favorites = this.currentUser.value?.favorites.filter(id => id != userId);
            this.updateCurrentUserInPeople();
            this.saveCurrentUserToLocalStorage();
        }
    }

    removeFavoritePersonFromUser(userId: number, friendId: number): void {
        console.log(userId, friendId);
        
        const person = this.people.find(person => person.id === userId);
        if (person) {
            person.favorites = person.favorites.filter(id => id != friendId);
            this.savePeopleToLocalStorage();
        }
    }

    updateProfile(updatedData: UpdateProfileData): void {
        if (this.currentUser.value) {
            Object.assign(this.currentUser.value, updatedData);
            this.updateCurrentUserInPeople();
            this.saveCurrentUserToLocalStorage();
        }
    }

    private updateCurrentUserInPeople(): void {
        if (this.currentUser.value) {
            const index = this.people.findIndex(person => person.id === this.currentUser.value!.id);
            if (index !== -1) {
                this.people[index] = this.currentUser.value!;
                this.savePeopleToLocalStorage();
            }
        }
    }

    private userExists(email: string): boolean {
        return this.people.some(person => person.Email === email);
    }

    public increaseHumanRating(userId: number): void {
        const person = this.people.find(person => person.id === userId);
        console.log(person);

        if (person) {
            if (person.Rating === 5) return;
            person.Rating += 0.1;
            person.Rating = Math.round(person.Rating * 10) / 10;
            this.savePeopleToLocalStorage();
        }
    }

    public deleteComment(userId: number, index: number): void {
        const person = this.people.find(person => person.id === userId);

        if (person) {
            person.comments?.splice(index, 1);
            this.savePeopleToLocalStorage();
        }
    }
}

const authService = new AuthService();

export function getIsAuthenticated(): boolean {
    return authService.isAuthenticated.value;
}

export function registerUser(PersonName: string, Email: string, Password: string, Age: number, Location: string): void {
    authService.register({ PersonName, Email, Password, Age, Location });
}

export function loginUser(email: string, password: string): void {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
        throw new Error('Некорректный формат email');
    }

    if (password.trim() === '') {
        throw new Error('Пароль не может быть пустым');
    }

    authService.login({ Email: email, Password: password });

    localStorage.setItem('user', email);
}

export function logoutUser(): void {
    localStorage.removeItem('user');
}

export function getCurrentUser(): Person | null {
    return authService.currentUser.value;
}

export function getCurrentUserId(): number {
    const user = authService.currentUser.value;
    return user ? user.id : 0;
}

export function isCurrentUser(email: string): boolean {
    const user = localStorage.getItem('user');
    return user === email;
}

export default authService;

export function getByUserId(userId: number): Person | undefined {
    return authService.people.find(person => person.id == userId);
}

export function addFavoritePerson(userId: number): void {
    authService.addFavorite(userId);
}

export function removeFavoritePerson(userId: number): void {
    authService.removeFavorite(userId);
}

export function getFavorites(): number[] {
    return authService.currentUser.value?.favorites || [];
}

export function getPeople(): Person[] {
    return authService.people || [];
}
