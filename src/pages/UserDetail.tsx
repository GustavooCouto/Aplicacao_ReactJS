import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Globe, MapPin, Building, FileText } from 'lucide-react';
import { api } from '../services/api';
import { User, Post } from '../types';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorMessage from '../components/ErrorMessage';

export default function UserDetail() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchUserData(parseInt(id));
    }
  }, [id]);

  const fetchUserData = async (userId: number) => {
    try {
      setLoading(true);
      setError(null);
      const [userData, postsData] = await Promise.all([
        api.getUser(userId),
        api.getUserPosts(userId)
      ]);
      setUser(userData);
      setUserPosts(postsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user');
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
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-8 bg-slate-200 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-slate-200 rounded"></div>
                  <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <LoadingSkeleton type="card" count={3} />
          </div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="space-y-6">
        <Link
          to="/users"
          className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Users</span>
        </Link>
        <ErrorMessage 
          message={error || 'User not found'} 
          onRetry={() => id && fetchUserData(parseInt(id))} 
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Link
        to="/users"
        className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors duration-200"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Users</span>
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* User Profile */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-6">
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-slate-900">{user.name}</h1>
                <p className="text-purple-600 font-medium">@{user.username}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-slate-500" />
                  <span className="text-slate-700">{user.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-slate-500" />
                  <span className="text-slate-700">{user.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-slate-500" />
                  <span className="text-slate-700">{user.website}</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-slate-500 mt-0.5" />
                  <div className="text-slate-700">
                    <div>{user.address.street}, {user.address.suite}</div>
                    <div>{user.address.city}, {user.address.zipcode}</div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Building className="w-5 h-5 text-slate-500" />
                  <span className="font-medium text-slate-900">{user.company.name}</span>
                </div>
                <p className="text-sm text-slate-600 italic mb-2">
                  "{user.company.catchPhrase}"
                </p>
                <p className="text-xs text-slate-500">
                  {user.company.bs}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* User Posts */}
        <div className="lg:col-span-2">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-slate-600" />
              <h2 className="text-xl font-semibold text-slate-900">
                Posts ({userPosts.length})
              </h2>
            </div>

            {userPosts.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600">No posts yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {userPosts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md hover:border-blue-200 transition-all duration-300"
                  >
                    <Link to={`/posts/${post.id}`} className="block space-y-3">
                      <h3 className="text-lg font-semibold text-slate-900 hover:text-blue-700 transition-colors duration-200">
                        {post.title}
                      </h3>
                      <p className="text-slate-600 line-clamp-2">
                        {post.body}
                      </p>
                      <div className="flex justify-between items-center text-sm text-slate-500">
                        <span>Post #{post.id}</span>
                        <span className="text-blue-600 hover:text-blue-700">
                          Read more →
                        </span>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}