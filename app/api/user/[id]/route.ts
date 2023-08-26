import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { connectDb } from "../../blogs/route";


// api end point for get one user by ID"/user/${id}" GET Method
export const GET =async (req : Request , res :NextResponse) => {
  try{
    await connectDb();
    const id = req.url.split("/user/")[1];
    const user = await prisma.user.findFirst({where : {id}})
    if(!user){
      return NextResponse.json({message:"unknown id" ,id},{status:401})
    }
    return NextResponse.json({message:"successful id is" ,user},{status:201})
  }catch(err){  
    return NextResponse.json({message:"unsuccessful" ,err},{status:501})
  }finally{
    await prisma.$disconnect()
  }
}

// api end point for get one user by ID"/user/${id}" GET Method
export const PUT =async (req : Request , res :NextResponse) => {
  try{
    await connectDb();
    const id = req.url.split("/user/")[1];
    const {name ,email} = await req.json()
    const user = await prisma.user.update({data:{name,email} ,where:{id}})
    if(! user){
      return NextResponse.json({message:"unknown id" ,id},{status:401})
    }
      return NextResponse.json({message:"successful update" ,user},{status:201})
  }catch(err){  
    return NextResponse.json({message:"unsuccessful update" ,err},{status:501})
  }finally{
    await prisma.$disconnect()
  }
}

// api end point for get one user by ID"/user/${id}" GET Method
export const DELETE =async (req : Request , res :NextResponse) => {
  try{
    await connectDb();
    const id = req.url.split("/user/")[1];
    const user = await prisma.user.delete({where:{id}})
    if(! user){
      return NextResponse.json({message:"unknown id" ,id},{status:401})
    }
      return NextResponse.json({message:"successful delete" ,user},{status:201})
  }catch(err){  
    return NextResponse.json({message:"unsuccessful delete" ,err},{status:501})
  }finally{
    await prisma.$disconnect()
  }
}