import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { connectDb } from "../route";


// api end point for get one post by ID"/blogs/${id}" GET Method
export const GET =async (req : Request , res :NextResponse) => {
  try{
    await connectDb();
    const id = req.url.split("/blogs/")[1];
    const post = await prisma.post.findFirst({where : {id}})
    if(!post){
      return NextResponse.json({message:"unknown id" ,id},{status:401})
    }
    return NextResponse.json({message:"successful id is" ,post},{status:201})
  }catch(err){  
    return NextResponse.json({message:"unsuccessful" ,err},{status:501})
  }finally{
    await prisma.$disconnect()
  }
}
// api end point for update one post by ID"/blogs/${id}" GET PUT
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
// api end point for DELETE one post by ID"/blogs/${id}" GET DELETE
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