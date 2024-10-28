import { Avatar } from '@nextui-org/react';
import { Input } from '@nextui-org/input';
import { motion } from 'framer-motion';

function Topbar() {
  const username = localStorage.getItem('username');
  return (
    <div className="bg-background w-full text-text flex flex-col lg:flex-row p-3 justify-between items-center px-6">
      <div className="lg:w-1/2 flex flex-row gap-5">
        <div>
          <motion.h1
            whileHover={{ color: 'aqua' }}
            style={{ fontSize: '1.5rem', fontWeight: 'bold' }}
          >
            {username}
          </motion.h1>
          <motion.p
            whileHover={{ scale: '1.05' }}
            transition={{ duration: 1.2 }}
          >
            Hello, Welcome back!
          </motion.p>
        </div>
      </div>
      <div>
        <Input
          placeholder="Search"
          size="lg"
          color="secondary"
          variant="underlined"
        ></Input>
      </div>
    </div>
  );
}

export default Topbar;
