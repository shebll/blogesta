import prisma from "@/prisma";
import { NextResponse } from "next/server";

export async function connectDb() {
  try{
    await prisma.$connect();
  } catch (error){
    return Error("can ont connect to database");
  }
}
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