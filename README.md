### Work in Progress

- [ ] Home Screen
  - [ ] Display user plants
  - [ ] Paginate plant feed / Infinite scrolling
  - [ ] Refresh list on pulldown

- [ ] Posts Screen
  - [ ] Display individual plant details.
  - [ ] Paginate post list / Infinite scrolling
  - [ ] Refresh list on pulldown 

- [ ] Discover Screen
  - [ ] Show latest plant posts.

- [ ] Follow / Search Users

- [ ] Plants
  - [ ] Create - Add plant to user's home screen.
  - [ ] Edit
  - [ ] Delete - Remove plant form user's home screen.

- [ ] Posts
  - [ ] Create - Add post to existing plant.
  - [ ] Edit
  - [ ] Delete - Remove post from existing plant.


- [ ] Server-Side
  - [ ] Validate CRUD actions server-side.


### Example Object Structures

plant: {
  name: '',
  species: '',
  genus: '',
  text: '',
  image: '',
  author: {
    full_name: '',
    profile_picture: '',
  },
  uid: '',
  timestamp: '',
}

post: {
  pid: '',
  text: '',
  image: '',
  timestamp: '',
  author: {
    full_name: '',
    profile_picture: '',
  }
}