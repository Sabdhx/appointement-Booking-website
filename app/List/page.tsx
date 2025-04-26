
import { getAllPost } from '@/action/user'
import Post from './post/Post'

type Props = {}

async function page({}: Props) {
    const allPost = await getAllPost()
  console.log(allPost[0])
  return (
    <div className=' grid grid-cols-3 my-6'>
      {
        allPost.map((item:any,index:number)=>{
          return(
         
              <Post key={index} title={item.title} description={item.description} businessType={item.businessType} duration={item.duration} price={item.price} paymentStatus={item.paymentStatus} serviceType={item.serviceType} images={item.images} bookingData={item.bookingData} providerId={item.providerId} _id={item._id}/>
             
            
     
          )
        })
      }
    
    </div>
  )
}

export default page