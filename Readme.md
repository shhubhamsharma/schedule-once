## Node JS
---


###Q1. When is it a good idea to not use NodeJs? Why? 

> Node is not suitable for appliation which are require lot of computations or which are CPU intensive. Node runs on single thread which mean only single thread will be responsible for doing computation while doing heavy computtion it will block the execution of code.
---

### Marco Polo Game
#### Method : get
##### Execution Steps:
1.Hit http://localhost:5000/marcoPolo API from browser or  REST client 

---

### User Story 1 - Parse invoice numbers
### User Story 2 - Handle invalid numbers
#### Execution Steps :
1. run npm install (to install all the dependencies)
2. `npm start` to start the application.
2. Open [http://localhost:5000](http://localhost:5000)  in the browser
3. Upload sample input file.
4. Output of parsed number will be displayed in browser with a output file generated with the name output_story_txt.txt in the root folder of the application.

---

### Testing 

`npm test`