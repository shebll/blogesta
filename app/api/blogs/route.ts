import prisma from "@/prisma";
import { NextResponse } from "next/server";
// connect to database
export async function connectDb() {
  try{
    await prisma.$connect();
  } catch (error){
    return Error("can ont connect to database");
  }
}
// api end point for get all posts "/blogs" GET Method
export const GET =async (req :Request,res :NextResponse) => {
  try{
    await connectDb();
    const posts = await prisma.post.findMany()
    return NextResponse.json({message:"connect to database" ,posts},{status:200})
  } catch (error){   
    return NextResponse.json({message:"can ont connect to database" ,error},{status:500})
  }finally{
    await prisma.$disconnect()
  }
}
// api end point for create new Post "/blogs" POST Method
export const POST =async (req :Request,res :NextResponse) => {
  try{
    await connectDb();
    const {title ,description} = await req.json()
    const post = await prisma.post.create({data:{description,title }})
    return NextResponse.json({message:"post successfully created" ,post},{status:201})
  } catch (error){
    return NextResponse.json({message:"post did not created" ,error},{status:500})
  }finally{
    await prisma.$disconnect()
  }
}