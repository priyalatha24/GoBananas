import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  TextField, 
  Typography, 
  Container 
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  appContainer: {
    backgroundColor: "#E6E6FA",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "black",
  },
  table: {
    minWidth: 700,
  },
  searchInput: {
    marginBottom: 25,
    "& .MuiOutlinedInput-input::placeholder": {
      color: "black",
    },
  },
  title: {
    margin: "32px 0 16px",
  },
  tableContainer: {
    maxHeight: 440,
  },
  headerCell: {
    backgroundColor: "black",
    color: "white",
  },
});

const App = () => {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className={classes.appContainer}>
      <Container maxWidth="lg">
        <Typography variant="h4" className={classes.title} align="center">
          GoBanana Assignment
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search here"
          className={classes.searchInput}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table className={classes.table} stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell className={classes.headerCell}>ID</TableCell>
                <TableCell className={classes.headerCell}>Title</TableCell>
                <TableCell className={classes.headerCell}>Body</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts
                .filter((post) =>
                  post.title.toLowerCase().includes(search.toLowerCase())
                )
                .map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>{post.id}</TableCell>
                    <TableCell>{post.title}</TableCell>
                    <TableCell>{post.body}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default App;
