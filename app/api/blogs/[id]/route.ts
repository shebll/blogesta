import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { connectDb } from "../route";



export const GET =async (req : Request , res :NextResponse) => {
  try{
    await connectDb();
    const id = req.url.split("/blogs/")[1];
    const post = prisma.post.findFirst({where : {id}})
    if(! post){
      return NextResponse.json({message:"unknown id" ,id},{status:401})
    }
    return NextResponse.json({message:"successful id is" ,post},{status:201})
  }catch(err){  
    return NextResponse.json({message:"unsuccessful" ,err},{status:501})
  }finally{
    
  }
}