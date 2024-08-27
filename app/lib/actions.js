'use server'
import { Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation';
import {z} from 'zod';

const formSchema = z.object({
  id : z.string(),
  username : z.string({
    invalid_type_error : "Please enter a username."
  }).min(1,"Please enter a username."),
  password : z.string({
    invalid_type_error : "Please enter a password."
  }).min(5,"Password must of length atleast 5."),
  whatsapp : z.string({
    invalid_type_error : "Please enter a whatsapp number."
  }).length(10,"Please enter a valid whatsapp number.")
})


const RegisterUser = formSchema.omit({id : true});
const LoginUser = formSchema.omit({id : true, whatsapp : true});

const prisma = new PrismaClient();

export async function registerUser(prevState , formData){
  const validatedFields = RegisterUser.safeParse({
    username : formData.get('username'),
    password : formData.get('password'),
    whatsapp : formData.get('whatsapp')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Register User.',
    };
  }
  const {username, password, whatsapp} = validatedFields.data;
  try{
  const newuser = await prisma.users.create({
    data : {
      username,
      password,
      whatsapp
    }
  })
} catch(error){
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002' && error.meta.target.includes('username')) {
      return {
        errors: { username: ['Username is already taken'] },
        message: 'Username is already taken. Failed to register user.',
      };
    }
  }
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002' && error.meta.target.includes('whatsapp')) {
      return {
        errors: { whatsapp: ['Whatsapp number already exists.'] },
        message: 'Whatsapp number already exists. Failed to register user.',
      };
    }
  }
  return {
    errors:  {database: [error.message] },
    message : 'Database Error : Failed to register user.',
  };
}
  redirect('/');
}



export async function loginUser(prevState, formData){
  const validatedFields = LoginUser.safeParse({
    username : formData.get('username'),
    password : formData.get('password')
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Send Prompt.',
    };
  }
  const {username, password} = validatedFields.data;
  try{
    const user = await prisma.users.findFirst({
      where : {
        username : username
      }
    });
    console.log(user);
    if(user ){
      if(user.password === password){
        console.log('matched');
        // make request to sendPrompt endpoint....
        
      } else{
        return {
          errors: { password: ['Username and Password does not match'],
                    username : ['Username and Password does not match']
           },
          message: 'Username and Password does not match.',
        };
      }
    }
    else{
      return {
        errors : {username : ['Username does not exist']},
        message : 'Username does not exist.',
      };
    }
    
  } catch(error){
    return {
      errors: { database: [error.message] },
      message: 'Database error. Couldn\'t log user in.'
    }
  }
  redirect('/');
};