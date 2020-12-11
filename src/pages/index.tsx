import React from "react"
import { useQuery, useMutation } from "@apollo/client"
import gql from "graphql-tag"
import { Formik, Form, Field } from "formik"
import "./index.css"
import CircularProgress from "@material-ui/core/CircularProgress"
import NotFoundPage from './404';

const getBookmarks = gql`
  {
    bookmarks {
      id
      url
      title
      description
    }
  }
`
const addBookmark = gql`
  mutation addBookmark($url: String!, $description: String, $title: String!) {
    addBookmark(url: $url, description: $description, title: $title) {
      url
      title
      description
    }
  }
`
const deleteBookmark = gql`
  mutation delBookmark($id: ID!) {
    delBookmark(id: $id) {
      url
      title
      description
    }
  }
`

export default function Home() {
  const { loading, error, data } = useQuery(getBookmarks)
  const [addBook] = useMutation(addBookmark)
  const [delBook] = useMutation(deleteBookmark)
  const handleDelete = event => {
    delBook({
      variables: {
        id: event.currentTarget.value,
      },
      refetchQueries: [{ query: getBookmarks }],
    })
  }
//   if (error) {
//     return <h4>error</h4>
//   }
  return (
    <div>
      <div className="head">
        <h2 style={{color:'blue', fontFamily:'-moz-initial'}}>LINKMARK</h2>
      </div>
      <div>
        <Formik
          onSubmit={(value, actions) => {
            addBook({
              variables: {
                url: value.url,
                description: value.description,
                title: value.title,
              },
              refetchQueries: [{ query: getBookmarks }],
            })
            actions.resetForm({
              values: {
                url: "",
                description: "",
                title: "",
              },
            })
          }}
          initialValues={{
            url: "",
            description: "",
            title: "",
            
          }}
          
          
        >
          {formik => (
            <Form onSubmit={formik.handleSubmit}>
              <div className="input-main">
                <div className="input-div">
                  <Field type="text" name="url" id="url" placeholder="link" />
                  <Field
                    type="text"
                    name="title"
                    id="title"
                    placeholder="title"
                    
                  />
                  <Field
                    type="description"
                    name="description"
                    id="description"
                    placeholder="description"
                  />
                  <button type="submit">submit</button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className="data-display">
        {loading ? (
          <div className="loader">
            <CircularProgress />
          </div>
        ) : (
          <div className="data-div">
            {data !== undefined || (null && data.bookmarks.length !== 0)
              ? data.bookmarks.map((v, i) => (
                  <div key={i} className="div">
                    <div>
                      <h3>{v.title}</h3>
                    </div>
                    <div>
                      <p>{v.description}</p>
                    </div>
                    <div>
                      <button>
                        <a href={v.url} target="blank">
                          view
                        </a>
                      </button>
                      <button onClick={handleDelete} value={v.id}>
                        del
                      </button>
                    </div>
                  </div>
                ))
              : ""}
          </div>
        )}
      </div>
    </div>
  )
}









// import React, { useEffect, useState } from "react"
// import { useQuery, useMutation } from '@apollo/client';
// import gql from 'graphql-tag';
// import "./style.css";
// import Card from '../components/card';

// const GET_BOOKMARKS = gql`
// {
//     bookmarks {
//         id
//         url
//         title
//     }
// }
// `;

// const ADD_BOOKMARK = gql`
//     mutation addBookmar($url: String!, $title: String!){
//         addBookmark(url: $url, title: $title){
//             id
//         }
//     }
// `

// export default function Home() {

//     let titleField;
//     let urlField;

//     const { error, loading, data } = useQuery(GET_BOOKMARKS);
//     const [addBookmark] = useMutation(ADD_BOOKMARK);
//     const handleSubmit = () => {
//         console.log(titleField.value)
//         console.log(urlField.value)
//         addBookmark({
//             variables: {
//                 url: urlField.value,
//                 title: titleField.value
//             },
//             refetchQueries: [{ query: GET_BOOKMARKS }]
//         })
//     }

//     if (error)
//         return <h3>{error}</h3>

//     if (loading)
//         return <h3>Loading..</h3>

//     return <div className="container">

//         <h2>Add New Bookmark</h2>
//         <label>
//             Enter Bookmark Tite: <br />
//             <input type="text" ref={node => titleField = node} />
//         </label>

//         <br />
//         <label>
//             Enter Bookmark Url: <br />
//             <input type="text" ref={node => urlField = node} />
//         </label>

//         <br />
//         <br />
//         <button onClick={handleSubmit}>Add Bookmark</button>

//         <h2>My Bookmark List</h2>
//         {/* {JSON.stringify(data.bookmarks)} */}

//         <div>
//             {data.bookmarks.map((bm) => <Card url={bm.url} title={bm.title} />)}
//         </div>

//     </div>
// }