import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, User, MessageCircle, Mail } from 'lucide-react';
import { api } from '../services/api';
import { Post, Comment } from '../types';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorMessage from '../components/ErrorMessage';

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchPostData(parseInt(id));
    }
  }, [id]);

  const fetchPostData = async (postId: number) => {
    try {
      setLoading(true);
      setError(null);
      const [postData, commentsData] = await Promise.all([
        api.getPost(postId),
        api.getPostComments(postId)
      ]);
      setPost(postData);
      setComments(commentsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch post');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-slate-200 rounded animate-pulse"></div>
          <div className="h-6 bg-slate-200 rounded w-24 animate-pulse"></div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-slate-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-slate-200 rounded"></div>
              <div className="h-4 bg-slate-200 rounded w-5/6"></div>
              <div className="h-4 bg-slate-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
        <LoadingSkeleton type="list" count={3} />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="space-y-6">
        <Link
          to="/posts"
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Posts</span>
        </Link>
        <ErrorMessage 
          message={error || 'Post not found'} 
          onRetry={() => id && fetchPostData(parseInt(id))} 
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Link
        to="/posts"
        className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Posts</span>
      </Link>

      <article className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <div className="space-y-6">
          <div className="flex items-center space-x-3 text-sm text-slate-500">
            <User className="w-4 h-4" />
            <span>User {post.userId}</span>
            <span>•</span>
            <span>Post #{post.id}</span>
          </div>
          
          <h1 className="text-3xl font-bold text-slate-900 leading-tight">
            {post.title}
          </h1>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-lg leading-relaxed text-slate-700">
              {post.body}
            </p>
          </div>
        </div>
      </article>

      <section className="space-y-6">
        <div className="flex items-center space-x-2">
          <MessageCircle className="w-5 h-5 text-slate-600" />
          <h2 className="text-xl font-semibold text-slate-900">
            Comments ({comments.length})
          </h2>
        </div>

        {comments.length === 0 ? (
          <div className="text-center py-8">
            <MessageCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600">No comments yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-white rounded-lg shadow-sm border border-slate-200 p-6"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-slate-900">
                      {comment.name}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-slate-500">
                      <Mail className="w-4 h-4" />
                      <span>{comment.email}</span>
                    </div>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    {comment.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}