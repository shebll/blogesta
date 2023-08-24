import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { connectDb } from "../route";



export const GET =async (req : Request , res :NextResponse) => {
  try{
    await connectDb();
    const id = req.url.split("/blogs/")[1];
    const post = await prisma.post.findFirst({where : {id}})
    if(! post){
      return NextResponse.json({message:"unknown id" ,id},{status:401})
    }
    return NextResponse.json({message:"successful id is" ,post},{status:201})
  }catch(err){  
    return NextResponse.json({message:"unsuccessful" ,err},{status:501})
  }finally{
    await prisma.$disconnect()
  }
}
export const PUT =async (req : Request , res :NextResponse) => {
  try{
    await connectDb();
    const id = req.url.split("/blogs/")[1];
    const {title ,description} = await req.json()
    const post = await prisma.post.update({data:{description,title } ,where:{id}})
    if(! post){
      return NextResponse.json({message:"unknown id" ,id},{status:401})
    }
      return NextResponse.json({message:"successful update" ,post},{status:201})
  }catch(err){  
    return NextResponse.json({message:"unsuccessful update" ,err},{status:501})
  }finally{
    await prisma.$disconnect()
  }
}
export const DELETE =async (req : Request , res :NextResponse) => {
  try{
    await connectDb();
    const id = req.url.split("/blogs/")[1];
    const post = await prisma.post.delete({where:{id}})
    if(! post){
      return NextResponse.json({message:"unknown id" ,id},{status:401})
    }
      return NextResponse.json({message:"successful delete" ,post},{status:201})
  }catch(err){  
    return NextResponse.json({message:"unsuccessful delete" ,err},{status:501})
  }finally{
    await prisma.$disconnect()
  }
}