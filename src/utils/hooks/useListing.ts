import { useState, useMemo, useCallback, useEffect } from "react";

//
import { Post } from "@/types";

type UseListingArgs = {
  key: string;
  posts: Post[];
  totalCount: number;
  loadMore: (page: number) => Promise<Post[]>;
};

const useListing = (arg: UseListingArgs) => {
  const { key, posts: _posts, totalCount, loadMore: _loadMore } = arg;

  const [posts, setPosts] = useState<Post[]>(_posts);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);

  const canLoadMore = useMemo(() => {
    return posts.length < totalCount;
  }, [posts, totalCount]);

  const loadMore = useCallback(async () => {
    setLoading(true);

    try {
      const posts = await _loadMore(page);

      setPosts((prev) => [...prev, ...posts]);
      setPage((prev) => prev + 1);
    } catch (e) {}

    setLoading(false);
  }, [_loadMore, page]);

  useEffect(() => {
    setPosts(_posts);
    setPage(2);
    setLoading(false);
  }, [key]);

  return {
    posts,
    canLoadMore,
    loadMore,
    loading,
  };
};

export default useListing;
