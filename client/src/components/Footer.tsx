export const Footer = () => {
  return (
    <div className="py-4 px-4 flex items-center justify-center">
      <p className="text-slate-500 text-sm text-center md:text-left">
        &copy; {new Date().getFullYear()} Arijit Mondal. All rights reserved.
      </p>
    </div>
  );
};
