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
  // if (error) {
  //   return <h4>error</h4>
  // }
  return (
    <div>
      <div className="head">
        <h2 style={{color: "navy", fontFamily:'initial'}}>BootMark</h2>
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
                  <div key={i} className="div2" style={{color: 'white', width:"200px", height: '150px', borderRadius: '50%'}}>
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









// import React from "react"
// import { useQuery, useMutation } from "@apollo/client"
// import gql from "graphql-tag"
// import { Formik, Form, Field } from "formik"
// import "./index.css"
// import CircularProgress from "@material-ui/core/CircularProgress"

// const getBookmarks = gql`
//   {
//     bookmarks {
//       id
//       url
//       title
//       description
//     }
//   }
// `
// const addBookmark = gql`
//   mutation addBookmark($url: String!, $description: String, $title: String!) {
//     addBookmark(url: $url, description: $description, title: $title) {
//       url
//       title
//       description
//     }
//   }
// `
// const deleteBookmark = gql`
//   mutation delBookmark($id: ID!) {
//     delBookmark(id: $id) {
//       url
//       title
//       description
//     }
//   }
// `

// export default function Home() {
//   const { loading, error, data } = useQuery(getBookmarks)
//   const [addBook] = useMutation(addBookmark)
//   const [delBook] = useMutation(deleteBookmark)
//   const handleDelete = event => {
//     delBook({
//       variables: {
//         id: event.currentTarget.value,
//       },
//       refetchQueries: [{ query: getBookmarks }],
//     })
//   }
//   if (error) {
//     return <h4>error</h4>
//   }
//   return (
//     <div>
//       <div className="head">
//         <h2>Bookmark App</h2>
//       </div>
//       <div>
//         <Formik
//           onSubmit={(value, actions) => {
//             addBook({
//               variables: {
//                 url: value.url,
//                 description: value.description,
//                 title: value.title,
//               },
//               refetchQueries: [{ query: getBookmarks }],
//             })
//             actions.resetForm({
//               values: {
//                 url: "",
//                 description: "",
//                 title: "",
//               },
//             })
//           }}
//           initialValues={{
//             url: "",
//             description: "",
//             title: "",
//           }}
//         >
//           {formik => (
//             <Form onSubmit={formik.handleSubmit}>
//               <div className="input-main">
//                 <div className="input-div">
//                   <Field type="text" name="url" id="url" placeholder="link" />
//                   <Field
//                     type="text"
//                     name="title"
//                     id="title"
//                     placeholder="title"
//                   />
//                   <Field
//                     type="description"
//                     name="description"
//                     id="description"
//                     placeholder="description"
//                   />
//                   <button type="submit">submit</button>
//                 </div>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>
//       <div className="data-display">
//         {loading ? (
//           <div className="loader">
//             <CircularProgress />
//           </div>
//         ) : (
//           <div className="data-div">
//             {data !== undefined || (null && data.bookmarks.length !== 0)
//               ? data.bookmarks.map((v, i) => (
//                   <div key={i} className="div">
//                     <div>
//                       <h3>{v.title}</h3>
//                     </div>
//                     <div>
//                       <p>{v.description}</p>
//                     </div>
//                     <div>
//                       <button>
//                         <a href={v.url} target="blank">
//                           view
//                         </a>
//                       </button>
//                       <button onClick={handleDelete} value={v.id}>
//                         del
//                       </button>
//                     </div>
//                   </div>
//                 ))
//               : ""}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }