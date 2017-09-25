export class Login {
    username: string;
    password: string;
}
export class SignUp {
    name: string;
    username: string;
    email: string;
    password: string;
    age?: number;
    company?: string;
    secret_ques?: string;
    seceret_ans?: string;
}

export class PostReply {
    username: string;
    reply: string;
}

export class NewPost {
    posts?: any;
    username: string;
    post: string;
    replies?: any[];
}


