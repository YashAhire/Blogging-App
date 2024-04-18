import {useState,useRef,useEffect,useReducer} from "react";
import {db} from "../firebase";

import { collection, addDoc } from "firebase/firestore"; 

// Add a new document with a generated id.

//Blogging App using Hooks

// reducer function
function blogReducer(state,action){
    switch(action.type){
        case "ADD":
            return [action.blog, ...state]
        case "REMOVE":
            return state.filter((blog,index)=> index !== action.index)
        default:
            return [];
    }
}

export default function Blog(){
    
    // const [title, setTitle] = useState("");
    // const [content, setContent] = useState("");
    const [formData, setFormData] = useState({title:"",content:""});
    // const [blogs, setBlogs] = useState([]);

    // useReducer hook
    const[blogs, dispatch] = useReducer(blogReducer,[]);
    const titleRef = useRef(null);

    useEffect(()=>{
        titleRef.current.focus();
    },[])

    useEffect(()=>{
        if(blogs.length && blogs[0].title){
            document.title = blogs[0].title;
        }else{
            document.title = "No blogs!";
        }

    },[blogs])

    //Passing the synthetic event as argument to stop refreshing the page on submit
    async function handleSubmit(e){
        e.preventDefault();
        // setBlogs([{title:formData.title,content:formData.content},...blogs]);
        dispatch({type:"ADD", blog:{title:formData.title,content:formData.content}});

        await addDoc(collection(db, "blogs"), {
            title: formData.title,
            content: formData.content,
            createdOn: new Date()
          });
        //   console.log("Document written with ID: ", docRef.id);

        setFormData({title:"",content:""});
        titleRef.current.focus();
        console.log(blogs);
    }

    function removeBlog(i){
        // setBlogs(blogs.filter((blog,index)=> i!==index ));
        dispatch({type:"REMOVE", index: i})
    }

    return(
        <>
        <h1>Write a Blog!</h1>

        <div className="section">

        {/* Form for to write the blog */}
            <form onSubmit={handleSubmit}>

                {/* Row component to create a row for first input field */}
                <Row label="Title">
                        <input className="input"
                                placeholder="Enter the Title of the Blog here.."
                                value={formData.title}
                                onChange={(e) => setFormData({title:e.target.value,content:formData.content})}
                                ref = {titleRef}
                                />
                </Row >

                <Row label="Content">
                        <textarea className="input content"
                                placeholder="Content of the Blog goes here.."
                                value={formData.content}
                                onChange={(e) => setFormData({title:formData.title,content:e.target.value})}
                                required/>
                </Row >

                {/* Button to submit the blog */}            
                <button className = "btn">ADD</button>
            </form>
                     
        </div>

        <hr/>

        {/* Section where submitted blogs will be displayed */}
        <h2> Blogs </h2>
        
        {blogs.map((blog,i)=>(
            <div className="blog" key={i}>

                <h3>{blog.title}</h3>
                <p>{blog.content}</p>

                <div className="blog-btn">
                    <button onClick={() => removeBlog(i)} className="btn remove">Delete</button>
                </div>
            </div>
        ))}

        </>
        )
    }

//Row component to introduce a new row section in the form
function Row(props){
    const{label} = props;
    return(
        <>
        <label>{label}<br/></label>
        {props.children}
        <hr />
        </>
    )
}
