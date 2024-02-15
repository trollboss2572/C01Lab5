// test("1+2=3, empty array is empty", () => {
//     expect(1 + 2).toBe(3);
//     expect([].length).toBe(0);
//   });


const SERVER_URL = "http://localhost:4000";

// test("/postNote - Post a note", async () => {
// const title = "NoteTitleTest";
// const content = "NoteTitleContent";

// const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
//     method: "POST",
//     headers: {
//     "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//     title: title,
//     content: content,
//     }),
// });
// const postNoteBody = await postNoteRes.json();
// expect(postNoteRes.status).toBe(200);
// expect(postNoteBody.response).toBe("Note added succesfully.");
// });

test("/getAllNotes - Return list of zero notes for getAllNotes", async () => {

  //Clear DB before we start
  const cleanNotes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
    "Content-Type": "application/json",
    },
  })

  expect(cleanNotes.status).toBe(200)
  const cleanJSON = await cleanNotes.json()
  expect(cleanJSON.response).toBe("1 note(s) deleted.")

  // Code here
  const notes = await fetch(`${SERVER_URL}/getAllNotes`, {
    method: "GET",
    headers: {
    "Content-Type": "application/json",
    }
    })
  const JSONNotes = await notes.json()
  expect(notes.status).toBe(200)
  expect(JSONNotes.response.length).toBe(0)
});

test("/getAllNotes - Return list of two notes for getAllNotes", async () => {
  // Code here

  const note1JSON = {
    title: "Title1",
    content: "Content1"
  }

  const note2JSON = {
    title: "Title2",
    content: "Content2"
  }

  const postNote1 = await fetch(`${SERVER_URL}/postNote`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      },
    body: JSON.stringify(note1JSON)
  })

  expect(postNote1.status).toBe(200)
  const postNoteBody = await postNote1.json();
  expect(postNoteBody.response).toBe("Note added succesfully.");


  const postNote2 = await fetch(`${SERVER_URL}/postNote`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      },
    body: JSON.stringify(note2JSON)
  })

  expect(postNote2.status).toBe(200)
  const postNoteBody2 = await postNote2.json();
  expect(postNoteBody2.response).toBe("Note added succesfully.");

  const notes = await fetch(`${SERVER_URL}/getAllNotes`, {
    method: "GET",
    headers: {
    "Content-Type": "application/json",
    }
    })
  const JSONNotes = await notes.json()
  expect(JSONNotes.response.length).toBe(2)
  expect(JSONNotes.response[1].content).toBe(note2JSON.content)
  expect(JSONNotes.response[1].title).toBe(note2JSON.title)
  expect(JSONNotes.response[0].content).toBe(note1JSON.content)
  expect(JSONNotes.response[0].title).toBe(note1JSON.title)
});

test("/deleteNote - Delete a note", async () => {
  // Code here
  const testDeleteJSON = {
    title: "Title1",
    content: "Content1"
  }


    const postNote = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify(testDeleteJSON)
    })

    expect(postNote.status).toBe(200)
    const postJSON = await postNote.json()
    expect(postJSON.response).toBe("Note added succesfully.");

    const deleteNote = await fetch(`${SERVER_URL}/deleteNote/${postJSON.insertedId}`, {
      method: "DELETE",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify(testDeleteJSON)
    })

    expect(deleteNote.status).toBe(200)
    const delJSON = await deleteNote.json()
    expect(delJSON.response).toBe(`Document with ID ${postJSON.insertedId} deleted.`)

});

test("/patchNote - Patch with content and title", async () => {

  const noteJSON = {
    title: "Title1",
    content: "Content1"
  }

  const patchInfoJSON = {
    title: "PatchT",
    content: "PatchC"
  }

  const postNote = await fetch(`${SERVER_URL}/postNote`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      },
    body: JSON.stringify(noteJSON)
  })

  expect(postNote.status).toBe(200)
  const postJSON = await postNote.json()
  expect(postJSON.response).toBe("Note added succesfully.")

  const patchNote = await fetch(`${SERVER_URL}/patchNote/${postJSON.insertedId}`, {
    method: "PATCH",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify(patchInfoJSON)
  })

  expect(patchNote.status).toBe(200)
  const patchJSON = await patchNote.json()
  expect(patchJSON.response).toBe(`Document with ID ${postJSON.insertedId} patched.`)

});

test("/patchNote - Patch with just title", async () => {
  const noteJSON = {
    title: "Title1",
    content: "Content1"
  }

  const patchInfoJSON = {
    title: "PatchT",
  }

  const postNote = await fetch(`${SERVER_URL}/postNote`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      },
    body: JSON.stringify(noteJSON)
  })

  expect(postNote.status).toBe(200)
  const postJSON = await postNote.json()
  expect(postJSON.response).toBe("Note added succesfully.")

  const patchNote = await fetch(`${SERVER_URL}/patchNote/${postJSON.insertedId}`, {
    method: "PATCH",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify(patchInfoJSON)
  })

  expect(patchNote.status).toBe(200)
  const patchJSON = await patchNote.json()
  expect(patchJSON.response).toBe(`Document with ID ${postJSON.insertedId} patched.`)

});

test("/patchNote - Patch with just content", async () => {
  const noteJSON = {
    title: "Title1",
    content: "Content1"
  }

  const patchInfoJSON = {
    content: "PatchC"
  }

  const postNote = await fetch(`${SERVER_URL}/postNote`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      },
    body: JSON.stringify(noteJSON)
  })

  expect(postNote.status).toBe(200)
  const postJSON = await postNote.json()
  expect(postJSON.response).toBe("Note added succesfully.")

  const patchNote = await fetch(`${SERVER_URL}/patchNote/${postJSON.insertedId}`, {
    method: "PATCH",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify(patchInfoJSON)
  })

  expect(patchNote.status).toBe(200)
  const patchJSON = await patchNote.json()
  expect(patchJSON.response).toBe(`Document with ID ${postJSON.insertedId} patched.`)

});

test("/deleteAllNotes - Delete one note", async () => {

  //Clear DB before we start
  const cleanNotes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
    "Content-Type": "application/json",
    },
  })

  expect(cleanNotes.status).toBe(200)
  const cleanJSON = await cleanNotes.json()
  expect(cleanJSON.response).toBe("5 note(s) deleted.")

  const testDeleteJSON = {
    title: "Title1",
    content: "Content1"
  }


    const postNote = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify(testDeleteJSON)
    })

    expect(postNote.status).toBe(200)
    const postJSON = await postNote.json()
    expect(postJSON.response).toBe("Note added succesfully.")

    const deleteAllNotes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
      method: "DELETE",
      headers: {
      "Content-Type": "application/json",
      },
    })


    expect(deleteAllNotes.status).toBe(200)

    const allNotesJSON = await deleteAllNotes.json()
    expect(allNotesJSON.response).toBe('1 note(s) deleted.')
});

test("/deleteAllNotes - Delete three notes", async () => {
  const testDeleteJSON = {
    title: "Title1",
    content: "Content1"
  }


    const postNote = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify(testDeleteJSON)
    })

    expect(postNote.status).toBe(200)
    const postJSON = await postNote.json()
    expect(postJSON.response).toBe("Note added succesfully.")

    const postNote2 = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify(testDeleteJSON)
    })

    expect(postNote2.status).toBe(200)
    const postJSON2 = await postNote2.json()
    expect(postJSON2.response).toBe("Note added succesfully.")
    

    const postNote3 = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify(testDeleteJSON)
    })

    expect(postNote3.status).toBe(200)
    const postJSON3 = await postNote3.json()
    expect(postJSON3.response).toBe("Note added succesfully.")

    const deleteAllNotes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
      method: "DELETE",
      headers: {
      "Content-Type": "application/json",
      },
    })


    expect(deleteAllNotes.status).toBe(200)

    const allNotesJSON = await deleteAllNotes.json()
    expect(allNotesJSON.response).toBe('3 note(s) deleted.')
});

test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {

  const testPatchJSON = {
    title: "Title1",
    content: "Content1"
  }


    const postNote = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify(testPatchJSON)
    })

    expect(postNote.status).toBe(200)
    const postJSON = await postNote.json()
    expect(postJSON.response).toBe("Note added succesfully.")


  const patchNote = await fetch(`${SERVER_URL}/updateNoteColor/${postJSON.insertedId}`, {
    method: "PATCH",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify({color: "#FF0000"})
  })

  expect(patchNote.status).toBe(200)
  const patchJSON = await patchNote.json()
  expect(patchJSON.message).toBe(`Note color updated successfully.`)

});