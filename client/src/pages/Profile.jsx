import { useUser } from '@clerk/clerk-react';

export default function Profile() {
  const { user } = useUser();

  if (!user) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      <p><strong>Email:</strong> {user.primaryEmailAddress?.emailAddress}</p>
      <p><strong>Name:</strong> {user.fullName}</p>
      <img src={user.imageUrl} alt="Avatar" className="w-24 h-24 rounded-full mt-4" />
    </div>
  );
}