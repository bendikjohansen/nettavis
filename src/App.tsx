import { Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Grid, Link, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { fetchAll, FetchAllResponse } from "./client";

const useAllArticles = () => {
    const [articleResponse, setArticleResponse] = useState<FetchAllResponse>();

    useEffect(() => {
        if (articleResponse === undefined) {
            fetchAll().then(setArticleResponse);
        }
    }, [articleResponse]);

    return articleResponse;
}

export const App = () => {
    const articleResponse = useAllArticles();

    return (
        <Container sx={{ p: 4 }}>
            <Typography variant="h3" gutterBottom textAlign="center">Nettavis</Typography>

            {articleResponse === undefined && (
                <Container sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Container>
            )}

            {articleResponse !== undefined && (
                <>
                    <Grid container spacing={2}>
                        {articleResponse.articles.map(article => (
                            <Grid item xs={4}>
                                <Link href={article.url}>
                                    <Card>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={article.urlToImage}
                                            alt="green iguana"
                                        />
                                        <CardContent>
                                            <Typography variant="h5">{article.title}</Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button variant="outlined">Save for later</Button>
                                        </CardActions>
                                    </Card>
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                    <Typography variant="body1" sx={{ mt: 4 }}>Search for 'Apple' yielded {articleResponse.totalResults} results.</Typography>
                </>
            )}
        </Container>
    );
};
