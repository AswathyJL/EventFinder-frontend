
import React from 'react'

const ApplicantManagement = () => {
  return (
    <div>
      <h1 className='text-primary'>Registration Details of Participants</h1>
      <table className='table'>
        <thead>
          <tr>
            <th>Serial No.</th>
            <th>Registration Id</th>
            <th>Username</th>
            <th>User Email</th>
            <th>User contact number</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>21/11/001</td>
            <td>userName</td>
            <td>userEmail</td>
            <td>contact</td>
            <td><i className="fa-solid fa-trash text-danger"></i></td>
          </tr>
          <tr>
            <td>1</td>
            <td>21/11/001</td>
            <td>userName</td>
            <td>userEmail</td>
            <td>contact</td>
            <td><i className="fa-solid fa-trash text-danger"></i></td>
          </tr>
          <tr>
            <td>1</td>
            <td>21/11/001</td>
            <td>userName</td>
            <td>userEmail</td>
            <td>contact</td>
            <td><i className="fa-solid fa-trash text-danger"></i></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ApplicantManagement